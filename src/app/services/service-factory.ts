import { AuthService } from "./auth.service";

export class ServiceFactory {
  private static instance: ServiceFactory;
  private services: Map<string, any>;
  private authService: AuthService;

  private constructor() {
    this.services = new Map<string, any>();
    this.authService = new AuthService();
  }

  public getAuthService(): AuthService {
    return this.authService;
  }   
  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  public registerService(name: string, service: any): void {
    this.services.set(name, service);
  }

  public getService<T>(name: string): T | undefined {
    return this.services.get(name) as T | undefined;
  }
}

export const authServiceProvider = ():AuthService => {
  const factory = ServiceFactory.getInstance();
  return factory.getAuthService();
}