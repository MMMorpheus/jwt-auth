import { createHash } from "node:crypto";
import { RequestHandler } from "express";
import Bowser from "bowser";

type UA = Bowser.Parser.ParsedResult; // user-agent - must be a result of bowser parsing or an empty object
export type FingerprintingData = UA & {
    accept: string;
    lang: string;
    encoding: string | string[];
};

export const createHeadersFingerprint: RequestHandler = async (req, res, next) => {
    try {
        const hash = createHash("sha256");
        const userAgent = Bowser.parse(req.headers["user-agent"] ?? "");

        const fingerprintingData: FingerprintingData = {
            ...userAgent,
            accept: req.headers.accept ?? "",
            lang: req.headers["accept-language"] ?? "",
            encoding: req.headers["accept-encoding"] ?? "",
        };

        const calcedHesh = hash.update(JSON.stringify(fingerprintingData)).digest("hex");

        req.fingerprint = {
            hash: calcedHesh,
            data: fingerprintingData,
        };
        next();
    } catch (error: unknown) {
        next(error);
    }
};
