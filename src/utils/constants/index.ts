export const SKILLS = [
    'javascript',
    'frontend',
    'reactjs',
    'vuejs',
    'angularjs',
    'backend',
    'expressjs',
    'nodejs',
    'nestjs',
    'typescript',
    'docker',
    'redis',
    'rabbitmq',
    'grpc',
    'kubernetes',
    'aws',
    'gcp',
    'azure',
  ] as const
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
=======

  export const ROLES = [ 'user' , 'company', 'admin'] as const
>>>>>>> changed role for company
  
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
  export const GENDERS = ['male', 'female', 'transgender'] as const
=======
  export const GENDERS = [ 'not specified','male', 'female'] as const
>>>>>>> corrected bugs
  
  export const SERVICES = {
    AUTH_SERVICE: 'AUTH',
    JOBS_SERVICE: 'JOBS',
    PAYMENTS_SERVICE: 'PAYMENTS',
    CHAT: 'CHAT',
    NOTIFICATIONS_SERVICE: 'NOTIFICATIONS',
  } as const
  
  export const JOB_TYPES = ['ON_SITE', 'REMOTE', 'HYBRID'] as const
  
  export const TARGETS = {
    USER: 'user',
    COMPANY: 'company',
    BOTH: 'both',
  } as const
  
  export const EXCEPTION_MSGS = {
    NULL_TOKEN: 'TokenNotProvided',
    UNAUTHORIZED: 'UnauthorizedAccess',
    JWT_EXPIRED: 'JwtExpired',
    INVALID_JWT: 'InvalidJwt',
  } as const
  
  export const APPLICATION_STATUSES = {
    ACCEPTED: 'accepted',
    DECLINED: 'declined',
    IN_PROCESS: 'in-process',
  } as const
  
  export const MESSAGE_TYPES = ['text', 'assignment', 'submission'] as const
  
  export const EVENTS = {
    CHAT_CREATED: 'chat-created',
    MESSAGE_CREATED: 'message-created',
    MESSAGE_RECIEVED: 'message-recieved',
    MESSAGE_SEEN: 'message-seen',
  } as const
  
  export const MESSAGE_STATUS = {
    SENT: 'sent',
    RECIEVED: 'recieved',
    SEEN: 'seen',
  } as const

  export const REMUNERATION = ['UNPAID' , 'PAID'];