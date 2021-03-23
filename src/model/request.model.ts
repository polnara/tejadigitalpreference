import { Preferences } from "./preferences.model";
import { Header } from "./header.model";
import { isObject } from "util";

export interface Request {
    preferences:Preferences;
    header:Header;

    
}