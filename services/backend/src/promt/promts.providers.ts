import { PROMTS_REPOSITORY } from 'src/constants';
import { Promt } from "./entities/promt.model";

export const promtProviders = [
    {
        provide: PROMTS_REPOSITORY,
        useValue: Promt,
    },
];