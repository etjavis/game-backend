import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service'
import { AppModule } from '../src/app.module'
import { SignInDto, SignUpDto } from 'src/auth/dto'
import { EditUserDto } from 'src/user/dto'

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  const testPort = 3333

  // Starting
  beforeAll(async () => {
    // Import everything
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true })
    )

    await app.init()
    await app.listen(testPort)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl(`http://localhost:${ testPort }`)
  })

  // Down
  afterAll(() => {
    app.close()
  })

  describe('System', () => {
    describe('Health check', () => {
      it('works', () => {
        return pactum
          .spec()
          .get('/system/health-check')
          .expectStatus(200)
          .expectBody('true')
      })
    })
  })

  describe('Auth', () => {
    const dtoSignUp: SignUpDto = {
      email: 'test@etjavis.com',
      password: '123',
      name: 'Test'
    }

    describe('SignUp', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dtoSignUp.password, name: dtoSignUp.name})
          .expectStatus(400)
      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dtoSignUp.email, name: dtoSignUp.name})
          .expectStatus(400)
      })

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)
      })

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dtoSignUp)
          .expectStatus(201)
      })
    })

    describe('SignIn', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dtoSignUp.password, name: dtoSignUp.name})
          .expectStatus(400)
      })

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dtoSignUp.email, name: dtoSignUp.name})
          .expectStatus(400)
      })

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)
      })

      it('should signin', () => {
        const dto: SignInDto = {
          email: dtoSignUp.email,
          password: dtoSignUp.password,
        }

        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'accessToken')
      })
    })
  })

  describe('User', () => {
    describe('Me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            'Authorization': 'Bearer $S{userAccessToken}'
          })
          .expectStatus(200)
      })
    })

    describe('Patch Me', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          name: "TestPatch"
        }

        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            'Authorization': 'Bearer $S{userAccessToken}'
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
      })
    })
  })

  describe('Game', () => {
    describe('List', () => {})
    describe('Show', () => {})
    describe('Patch', () => {})
    describe('Create', () => {})
    describe('Delete', () => {})
  })
})