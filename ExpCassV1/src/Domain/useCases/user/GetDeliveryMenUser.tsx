import React from 'react'
import { UserRepositoryImp } from '../../../Data/repositories/UserRepository'
const { getDeliveryMen } =  new UserRepositoryImp();

export const GetDeliveryMenUserUseCase = async () => {
  return await getDeliveryMen();
}
