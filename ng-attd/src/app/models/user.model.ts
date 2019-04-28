export class User {
    public id: string;
    public username: string;
    public password: string;
    public name: string;
    public role: string;
}

export class Student extends User {
    public intake: string;
    public modules: string[];
}
