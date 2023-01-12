import { applyDecorators, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { OnlyAdminGuard } from '../guards/only-admin.guard'
import { TypeRole } from '../auth.interface'

export const Auth = (role: TypeRole) =>
  applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : UseGuards(JwtAuthGuard)
  )
