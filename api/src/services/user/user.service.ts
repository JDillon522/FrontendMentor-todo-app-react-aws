import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  GetUserCommand,
  GetUserCommandInput,
  UpdateUserAttributesCommand,
  UpdateUserAttributesCommandInput,
  AttributeType
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class UserService {
  private client = new CognitoIdentityProviderClient({});

  public async getUser(token: string) {
    const params: GetUserCommandInput = {
      AccessToken: token
    };

    const command = await new GetUserCommand(params);
    const response = await this.client.send(command);


    return response;
  }

  public async updateUser(accessToken: string, attr: AttributeType) {
    const params: UpdateUserAttributesCommandInput = {
      AccessToken: accessToken,
      UserAttributes: [attr]
    }

    const command = new UpdateUserAttributesCommand(params);
    const response = await this.client.send(command);

    return response;
  }

}
