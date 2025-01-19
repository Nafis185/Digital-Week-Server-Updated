

// *install jsonwebtoken
// jwt sign(payload,secrect, {expiresIn:})
// token client
// 
// 
// 
// 
// 
// ****
// how to store token in the client side 
// 1.memory--> ok type
// 2.local strogaq --> ok type (XSS)
// 3.cookies: http only
// 
// 
// 
// 
// ******
// 1.set cookies with http only for development secure: false

// 2.cors 
// app.use(
//   cors({
//     origin: ["http://localhost:5173/"],
//     credentials: true,
//   })
// );

// 3.client side with axios setting 
// in axios set withCredentials: true
// 
// 
// 
// 
// 
// 
// -------------------------------
// *        MAKE API SECURE        *
// -------------------------------
// 
// THE PERSON WHO SHOULD BE AUTHENTICATED
// CONCEPT:
// 1.assign two two token for weach person(access token,refresh token)
// 2.token contains: user identitification (email.role/etc)valid for shorter duration
// 3.refresh token is used : to recreate an access token that was expired
// 4.if refresh is invalid then logout the user
// 
// 
// 
// 
// ******
// 1.jwt ====> json web token
// 2. generate a token by using jwt.sign
// 3.create api set to cookie , httppn;y, secure, sameSite
// 4.from client side: axios withcredentials : true
// 5.cors setup origin and credentitals: true 
// 
// 
// 
// ***********************
// 1.for secure apu calls
// 2.install cookie parser and use it as a middleware
// 3.req.cookies
// 4.on the clients side    : axios api call using axios withcredentials or credentials: true include while using fetch 
// 5./
