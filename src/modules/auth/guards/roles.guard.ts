import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // Check if user type matches one of the required roles
    // Or if user.role (for admins) matches
    // We assume requiredRoles can contain 'customer', 'owner', 'admin', 'manager', 'superadmin'

    if (!user) return false;

    // If user is admin, they have 'role' property (manager/superadmin) and 'type' = 'admin'
    // If user is customer/owner, they have 'type' = 'customer'/'owner'

    const userRoles = [user.type];
    if (user.role) {
      userRoles.push(user.role);
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
