import winston from "winston";
import { option } from "../config/commander.js";

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        http: 5,
        verbose: 6,
        silly: 7,
    },
    colors: {
        fatal: "red",
        error: "red",
        warn: "yellow",
        info: "green",
        debug: "blue",
        http: "magenta",
        verbose: "cyan",
        silly: "white",
    },

};

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            ),
        }),

    ] 
});

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,

    transports: [
        new winston.transports.File({ filename: 'errors.log', level: 'warn' })
    ]
});

export const logger = option.logger === 'PRODUCTION' ? prodLogger : devLogger;