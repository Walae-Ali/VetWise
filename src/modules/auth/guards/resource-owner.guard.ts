import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../common/enums/roles.enum';
import { RESOURCE_KEY } from '../decorators/resource-owner.decorator';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resourceType = this.reflector.getAllAndOverride<string>(
      RESOURCE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!resourceType) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Admins can access any resource
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    const resourceId = this.getResourceId(request, resourceType);
    if (!resourceId) {
      return false;
    }

    return this.checkOwnership(user, resourceType, resourceId, request);
  }

  private getResourceId(request: any, resourceType: string): number | null {
    switch (resourceType) {
      case 'animal':
        return parseInt(request.params.animalId, 10);
      case 'appointment':
        return parseInt(request.params.rendezvousId, 10);
      case 'medicalRecord':
        return parseInt(request.params.dossierMedicalId, 10);
      default:
        return null;
    }
  }

  private async checkOwnership(
    user: any,
    resourceType: string,
    resourceId: number,
    request: any,
  ): Promise<boolean> {
    // This would be implemented with repository injections
    // For demonstration purposes, we'll stub the ownership check

    // Example implementation (would need to be customized):
    switch (resourceType) {
      case 'animal':
        if (user.role === UserRole.PET_OWNER) {
          // Check if animal belongs to user
          return true; // Replace with actual repository check
        } else if (user.role === UserRole.VETERINARIAN) {
          // Vets can access animals they have appointments with
          return true; // Replace with actual repository check
        }
        break;

      case 'appointment':
        if (user.role === UserRole.PET_OWNER) {
          // Check if appointment belongs to user's pet
          return true; // Replace with actual repository check
        } else if (user.role === UserRole.VETERINARIAN) {
          // Check if vet is assigned to this appointment
          return user.veterinaire_id === request.params.veterinaireId;
        }
        break;
    }

    return false;
  }
}
