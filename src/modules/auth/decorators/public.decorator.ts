import { SetMetadata } from '@nestjs/common';
// setmeta fct fournie par nest pour créer des décourateurs personnalisés
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
