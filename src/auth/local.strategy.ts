import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "loginLocal") {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log("validate strategy....");
        console.log("Username: " + username + " PASSWORD: " + password);
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new HttpException('validate passport failed', HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}