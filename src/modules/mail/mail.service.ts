import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    const config = this.configService.get('mail');

    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  async sendVerificationEmail(
    email: string,
    firstName: string,
    token: string,
  ): Promise<void> {
    const appUrl = this.configService.get('mail').APP_URL;
    const verificationUrl = `${appUrl}/auth/verify-email?token=${token}`;

    const verificationEmailTemplate = readFileSync(
      join(__dirname, 'templates', 'verification-email.html'),
      'utf8',
    );

    const htmlContent = verificationEmailTemplate
      .replace('{{firstName}}', firstName)
      .replace('{{verificationUrl}}', verificationUrl);

    await this.transporter.sendMail({
      from: `"VetMed Support" <${this.configService.get('mail').from}>`,
      to: email,
      subject: 'Vérifiez votre adresse email - VetMed',
      html: htmlContent,
    });
  }

  /*async sendPasswordResetEmail(
    email: string,
    firstName: string,
    token: string,
  ): Promise<void> {
    const appUrl = this.config.get('APP_URL');
    const resetUrl = `${appUrl}/auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"VetMed Support" <${this.config.get('MAIL_FROM')}>`,
      to: email,
      subject: 'Réinitialisation de mot de passe - VetMed',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Bonjour ${firstName},</h2>
          <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe:</p>
          <p style="margin: 20px 0;">
            <a href="${resetUrl}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Réinitialiser mon mot de passe</a>
          </p>
          <p>Ou copiez ce lien dans votre navigateur:</p>
          <p>${resetUrl}</p>
          <p>Ce lien expirera dans 1 heure.</p>
          <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.</p>
          <p>Cordialement,<br>L'équipe VetMed</p>
        </div>
      `,
    });
  }*/
}
