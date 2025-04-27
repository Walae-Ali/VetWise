import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TwoFactorDto } from './dto/two-factor.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('two-factor/setup')
  async setupTwoFactor(@Request() req) {
    return this.authService.setupTwoFactor(req.user.utilisateur_id);
  }
  /*
  @UseGuards(JwtAuthGuard)
  @Post('two-factor/enable')
  @HttpCode(HttpStatus.OK)
  async enableTwoFactor(@Request() req, @Body() twoFactorDto: TwoFactorDto) {
    const isValid = this.authService.verifyTwoFactorCode(
      req.user.utilisateur_id,
      twoFactorDto.code,
    );

    if (!isValid) {
      return { success: false, message: 'Code invalide' };
    }

    await this.authService.enableTwoFactor(req.user.utilisateur_id);
    return {
      success: true,
      message: 'Authentification à deux facteurs activée',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('two-factor/disable')
  @HttpCode(HttpStatus.OK)
  async disableTwoFactor(@Request() req) {
    await this.authService.disableTwoFactor(req.user.utilisateur_id);
    return {
      success: true,
      message: 'Authentification à deux facteurs désactivée',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    // JWT tokens are stateless, so we don't need server-side logout
    // In a production app, you might want to add the token to a blacklist
    return { success: true, message: 'Déconnexion réussie' };
  }*/
}
