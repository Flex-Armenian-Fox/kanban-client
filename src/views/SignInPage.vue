<template>
  <div>
    <div v-if="signIn" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a @click.prevent="sign" href="#" class="font-medium text-indigo-400 hover:text-indigo-300"> sign up here </a>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="signInMethod">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-t-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Email address"
                v-model="signInData.email"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-b-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Password"
                v-model="signInData.password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="
                group
                relative
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                text-sm
                font-medium
                rounded-md
                bg-indigo-200
                hover:bg-indigo-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  class="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        <!-- <button v-google-signin-button="clientId" class="google-signin-button">Continue with Google</button> -->
        <div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn"></div>
      </div>
    </div>

    <div v-if="signUp" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to make an account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a @click.prevent="sign" href="#" class="font-medium text-indigo-400 hover:text-indigo-300"> sign in here </a>
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="signUpMethod">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-t-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Email address"
                v-model="signUpData.email"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="
                  appearance-none
                  rounded-none
                  relative
                  block
                  w-full
                  px-3
                  py-2
                  border border-gray-300
                  placeholder-gray-500
                  text-gray-900
                  rounded-b-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
                  sm:text-sm
                "
                placeholder="Password"
                v-model="signUpData.password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="
                group
                relative
                w-full
                flex
                justify-center
                py-2
                px-4
                border border-transparent
                text-sm
                font-medium
                rounded-md
                bg-indigo-200
                hover:bg-indigo-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  class="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInPage',
  props: ['loginId'],
  data() {
    return {
      signUp: false,
      signIn: true,
      signInData: {
        email: '',
        password: '',
      },
      signUpData: {
        email: '',
        password: '',
      },
      clientId: '1051183172531-s8ohs07adecklgfcsdsapel94ifgratg.apps.googleusercontent.com',
    };
  },
  methods: {
    sign() {
      this.signUp = !this.signUp;
      this.signIn = !this.signIn;
    },
    signInMethod() {
      const data = {
        email: this.signInData.email,
        password: this.signInData.password,
      };

      fetch('https://tolatelo.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localStorage.setItem('access_token', JSON.stringify(res.access_token));
          this.$emit('auth');
          this.$emit('loginId', JSON.stringify(res.id));
        });
    },
    signUpMethod() {
      const data = {
        email: this.signUpData.email,
        password: this.signUpData.password,
      };

      fetch('https://tolatelo.herokuapp.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          console.log(res);
          this.sign();
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    },
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      fetch('https://tolatelo.herokuapp.com/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
        data: {
          token: idToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localStorage.setItem('access_token', JSON.stringify(res.access_token));
          this.$emit('auth');
          this.$emit('loginId', JSON.stringify(res.id));
        });
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
};

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token);

  fetch('https://tolatelo.herokuapp.com/google-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
    data: {
      token: id_token,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('access_token', JSON.stringify(res.access_token));
      this.$emit('auth');
      this.$emit('loginId', JSON.stringify(res.id));
    });
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
