import { GENERATED_RESPONSE_REPOSITORY } from 'src/constants';
import { GeneratedResponse } from "./entities/generated.response.model";

export const generatedResponseProviders = [
    {
        provide: GENERATED_RESPONSE_REPOSITORY,
        useValue: GeneratedResponse,
    },
];