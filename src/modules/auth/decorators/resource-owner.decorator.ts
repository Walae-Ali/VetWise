import { SetMetadata } from '@nestjs/common';

export const RESOURCE_KEY = 'resourceType';
export const ResourceOwner = (resourceType: string) =>
  SetMetadata(RESOURCE_KEY, resourceType);
