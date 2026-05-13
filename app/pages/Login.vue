<script setup lang="ts">
definePageMeta({
    layout: 'auth',
});
</script>

<template>
    <div class="login">
        <div class="container">
            <div class="content">
                <FormContainer
                    title="Login to Fractal Notes"
                    submit-text="Sign in"
                >
                    <FormInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        required
                    />
                    <FormInput
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        required
                    >
                        <template #label-right>
                            <NuxtLink to="/forgot-password">
                                Forgot Password?
                            </NuxtLink>
                        </template>
                    </FormInput>
                    <template #footnote>
                        Don't have an account?
                        <NuxtLink to="/signup">Sign up</NuxtLink>
                    </template>
                </FormContainer>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login,
.container {
    height: 100%;
}

.login {
    padding-bottom: rem(150);
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
