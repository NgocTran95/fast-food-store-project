import * as yup from 'yup';
import { AnyObject, Maybe, Message } from 'yup/lib/types'

const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

yup.addMethod(yup.string, 'password', function(message) {
    return this.matches(REGEX_PASSWORD, {
        message,
        excludeEmptyString: true,
    })
})

declare module 'yup' {
    interface StringSchema<
      TType extends Maybe<string> = string | undefined,
      TContext extends AnyObject = AnyObject,
      TOut extends TType = TType,
    > extends yup.BaseSchema<TType, TContext, TOut> {
      password(message?: Message<{}> | undefined): StringSchema<TType, TContext>;
    }
  }

export default yup;