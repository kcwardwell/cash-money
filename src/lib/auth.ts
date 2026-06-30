
import { betterAuth } from "better-auth"
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
  //...other options
  emailAndPassword: { 
    enabled: true, 
  },
   plugins: [tanstackStartCookies()] // make sure this is the last plugin in the array
});


