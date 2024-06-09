import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from '../modules/auth/jwt-constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader) return false;
    request.user = await this.validateToken(authHeader);
    request.token = authHeader.split(' ')[1];
    return true;
  }

   async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }
     const token = auth.split(' ')[1];     
    try {
      return await this.jwtService.verifyAsync(token, jwtConstants);      
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
