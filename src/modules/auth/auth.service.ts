import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponse } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('auth-service')
    private readonly users = [
        {
            userId: 1,
            username: 'user',
            password: 'user321',
        }
    ];
    constructor(private jwtService: JwtService) { }


    async login(loginInfo: LoginDto): Promise<LoginResponse> {
        try {
            const user = this.users.find(({ username, password }) => username === loginInfo.username && password === loginInfo.password)
            if (!user) {
                this.logger.warn('Invalid credentials provided for username:', loginInfo.username);
                throw new UnauthorizedException('Invalid credentials');

            }
            const payload = { username: user.username, id: user.userId };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            this.logger.error('Error during login:', error.message);
            throw new UnauthorizedException('Login failed');
        }

    }
}
