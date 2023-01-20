import {AttributifyNames} from "windicss/types/jsx";

declare module "react" {

    interface AttributifyAttributes extends Partial<Record<AttributifyNames, string>> {
        // Add your own attributes here
        caret?: string;
        'max-w'?: string;
    }

    interface HTMLAttributes<T> extends AttributifyAttributes {
    }

    interface CSSProperties {
        "--arrow-offset-left"?: string;
        "--arrow-offset-top"?: string;
        "--message-color"?: string;
        "--message-duration"?: string;
    }
}
