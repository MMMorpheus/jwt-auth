import { FingerprintingData } from "../../middlewares/fingerprint.middleware.ts";
import { ParsedObj } from "../../middlewares/validate.middleware.ts";

type FingerprintPayload = {
    hash: string;
    data: FingerprintingData;
};


declare global {
    namespace Express {
        export interface Request {
            payload?: ParsedObj;
            fingerprint: FingerprintPayload;
        }
    }
}

