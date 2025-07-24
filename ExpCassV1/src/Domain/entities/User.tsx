import { Address } from "./Address";
import { Rol } from "./Rol";

export interface User {

    id?:         string;   
    name:        string;
    lastname:    string;
    email:       string;
    phone:       string;
    password:    string;
    image?:    string;
    conPassword: string;
    session_token?: string;
    notification_token?: string;
    roles?:         Rol[];
    address?:     Address;

}