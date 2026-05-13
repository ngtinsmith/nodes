<script setup lang="ts">
definePageMeta({
    layout: 'auth',
});
</script>

<template>
    <div class="signup">
        <div class="container">
            <div class="content">
                <FormContainer
                    title="Create an account"
                    submit-text="Sign up"
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
                    />
                    <template #footnote>
                        Already have an account?
                        <NuxtLink to="/login">Sign in</NuxtLink>
                    </template>
                </FormContainer>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.signup,
.container {
    height: 100%;
}

.signup {
    padding-bottom: rem(150);
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
