import {AttributifyAttributes} from "windicss/types/jsx";

declare module "react" {
    interface HTMLAttributes<T> extends AttributifyAttributes {
    }

    interface CSSProperties {
        "--arrow-offset-left"?: string;
        "--arrow-offset-top"?: string;
    }
}
