/**
 * Dependency Injection Container
 * Instantiates and manages all application dependencies
 *
 * Benefits:
 * - Centralized dependency management
 * - Easy to swap implementations (e.g., MongoDB for SQL)
 * - Facilitates testing with mocks/stubs
 * - Clear application structure
 *
 * Pattern: Service Locator + Factory
 */

const MongooseUserRepository = require('../persistence/MongooseUserRepository');
const BcryptPasswordProvider = require('../providers/BcryptPasswordProvider');
const JwtTokenProvider = require('../providers/JwtTokenProvider');
const CloudinaryAvatarProvider = require('../providers/CloudinaryAvatarProvider');

const RegisterUserUseCase = require('../../application/usecases/RegisterUserUseCase');
const LoginUserUseCase = require('../../application/usecases/LoginUserUseCase');
const GetCurrentUserUseCase = require('../../application/usecases/GetCurrentUserUseCase');
const UpdateUserProfileUseCase = require('../../application/usecases/UpdateUserProfileUseCase');
const UpdateUserAvatarUseCase = require('../../application/usecases/UpdateUserAvatarUseCase');

const AuthController = require('../../presentation/controllers/AuthController');

const {
  createAuthenticationMiddleware,
  createAuthorizationMiddleware
} = require('../middleware/AuthenticationMiddleware');

/**
 * Dependency Injection Container
 */
class Container {
  constructor() {
    this.services = new Map();
    this._initialize();
  }

  /**
   * Initialize all services
   */
  _initialize() {
    // Infrastructure Services
    this.register('userRepository', () => new MongooseUserRepository());
    this.register('passwordProvider', () => new BcryptPasswordProvider(10));
    this.register('tokenProvider', () =>
      new JwtTokenProvider(
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_TIME
      )
    );
    this.register('avatarProvider', () => new CloudinaryAvatarProvider());

    // Use Cases
    this.register('registerUseCase', () =>
      new RegisterUserUseCase(
        this.get('userRepository'),
        this.get('passwordProvider'),
        this.get('avatarProvider')
      )
    );

    this.register('loginUseCase', () =>
      new LoginUserUseCase(
        this.get('userRepository'),
        this.get('passwordProvider')
      )
    );

    this.register('getCurrentUserUseCase', () =>
      new GetCurrentUserUseCase(this.get('userRepository'))
    );

    this.register('updateProfileUseCase', () =>
      new UpdateUserProfileUseCase(this.get('userRepository'))
    );

    this.register('updateAvatarUseCase', () =>
      new UpdateUserAvatarUseCase(
        this.get('userRepository'),
        this.get('avatarProvider')
      )
    );

    // Controllers
    this.register('authController', () =>
      new AuthController(
        this.get('registerUseCase'),
        this.get('loginUseCase'),
        this.get('getCurrentUserUseCase'),
        this.get('updateProfileUseCase'),
        this.get('updateAvatarUseCase'),
        this.get('tokenProvider')
      )
    );

    // Middleware factories
    this.register('authenticationMiddleware', () =>
      createAuthenticationMiddleware(
        this.get('tokenProvider'),
        this.get('userRepository')
      )
    );

    this.register('authorizationMiddleware', () =>
      createAuthorizationMiddleware(this.get('userRepository'))
    );
  }

  /**
   * Register a service
   */
  register(name, factory) {
    this.services.set(name, { factory, singleton: false, instance: null });
  }

  /**
   * Register a singleton service
   */
  registerSingleton(name, factory) {
    this.services.set(name, { factory, singleton: true, instance: null });
  }

  /**
   * Get a service instance
   */
  get(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not registered`);
    }

    if (service.singleton && service.instance) {
      return service.instance;
    }

    const instance = service.factory();
    if (service.singleton) {
      service.instance = instance;
    }

    return instance;
  }
}

module.exports = Container;