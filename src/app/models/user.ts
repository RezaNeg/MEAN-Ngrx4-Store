export interface IUser {
    
        id? : number;
        admin?: boolean;
        firstname? : string;
        lastname? : string;
        displayName? : string;
        email? : string;
        password? : string;
        f_id? : string;
        f_name? :string;
        g_id? : string;
        g_name? : string;
        l_id?: string;
        l_name? : string;
        t_id? : string;
        t_name? : string;
        imageURL? : string;
        loading? : boolean;
        error? : string;
        ip? : string;
    }
    
    export class User implements IUser {
        constructor(
            public id? : number,
            public admin?: boolean,
            public firstname? : string,
            public lastname? : string,
            public displayName? : string,
            public email? : string,
            public password? : string,
            public f_id? : string,
            public f_name? :string,
            public g_id? : string,
            public g_name? : string,
            public l_id?: string,
            public l_name? : string,
            public t_id? : string,
            public t_name? : string,
            public imageURL? : string,
            public loading? : boolean,
            public error? : string,
            public ip? : string
         ){}
    }