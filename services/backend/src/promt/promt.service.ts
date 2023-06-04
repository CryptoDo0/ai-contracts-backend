import {Inject, Injectable, Logger} from '@nestjs/common';
import {PROMTS_REPOSITORY} from "../constants";
import {Promt} from "./entities/promt.model";
import {RequestNewPromt} from "./entities/dto/request.new.promt.dto";
import {FullPromt} from "./entities/inner/full.promt";
import {PromtApiException} from "../exceptions/promt.api.exception";

@Injectable()
export class PromtService {
    PROMT_REPLACE_MARKER = '${promt}'

    private logger = new Logger(PromtService.name);
    
    
    constructor(@Inject(PROMTS_REPOSITORY) private promtRepository: typeof Promt) {}
    
    public async saveNewPromt(requestNewPromt: RequestNewPromt) {
        const promt = await this.promtRepository.create({
            title: requestNewPromt.title,
            content: requestNewPromt.promt,
        });
        return promt;
    }
    
    public async getFullPromt(userPromt: string): Promise<FullPromt> {
        let promt = await this.getActualPromt();
        if (!promt) {
            this.logger.error("Full promt not allow. Actual promt not found.")
            throw new PromtApiException("Full promt not allow. Actual promt not found.");
        }
        
        if (promt.content.includes(this.PROMT_REPLACE_MARKER)) {
            return {
                promt: promt,
                content: promt.content.replace(this.PROMT_REPLACE_MARKER, userPromt)
            }
        }
        
        return {
            promt: promt,
            content: promt.content + ' ' + userPromt
        }
    }

    public async getActualPromt(): Promise<Promt> {
        return await this.promtRepository.findOne({
            order: [['createdAt', 'DESC']], // Order by 'createdAt' column in descending order
        });
    }
}
