<template>
    <div class="locale-dropdown" @click.stop="toggleOpen">
        <div class="current">
            <span v-if="currentLocale === 'en'">English</span>
            <span v-else>中文</span>
            <fa icon="chevron-down" class="arrow" />
        </div>

        <ul v-if="open" class="dropdown">
            <li @click.stop="changeLocale('en')">English</li>
            <li @click.stop="changeLocale('zh')">中文</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "LocaleSwitcher",
    data() {
        return {
            open: false,
        }
    },
    computed: {
        currentLocale() {
            return this.$i18n.locale;
        }
    },
    mounted() {
        // Click outside to close the dropdown
        document.addEventListener('click', this.closeDropdown);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    },
    methods: {
        toggleOpen() {
            this.open = !this.open;
        },
        changeLocale(locale, event) {
            this.$i18n.locale = locale;
            this.$router.push(this.switchLocalePath(locale));
            this.open = false;
        },
        closeDropdown(e) {
            if (!this.$el.contains(e.target)) {
                this.open = false;
            }
        }
    }
}
</script>

<style scoped>
.locale-dropdown {
    position: relative;
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    color: var(--dark-text);
}

.locale-dropdown .current {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 4px;
    background-color: var(--dark-ui);
    transition: background-color 0.2s;
}

.locale-dropdown .current:hover {
    color: var(--dark-hover);
}

.locale-dropdown .arrow {
    font-size: 12px;
}

.locale-dropdown .dropdown {
    position: absolute;
    top: 100%;
    width: 100%;
    margin-top: 1px;
    padding: 4px 0;
    list-style: none;
    background-color: var(--dark-ui);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    z-index: 100;
}

.locale-dropdown .dropdown li {
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background-color 0.2s, color 0.2s;
}
.locale-dropdown .dropdown li:hover {
    background-color: var(--accent);
    border-radius: 6px;
    color: var(--dark-hover);
}

@media only screen and (max-width: 600px) {
    .locale-dropdown {
        color: var(--dark-text);
    }
    .locale-dropdown .current {
        background-color: var(--dark-ui);
        color: var(--dark-text);
    }
    .locale-dropdown .current:hover {
        color: var(--dark-hover);
    }

    .locale-dropdown .dropdown {
        background-color: var(--dark-ui);
        color: var(--dark-text);
        width: fit-content;
    }
    .locale-dropdown .dropdown li:hover {
        background-color: var(--accent);
        color: var(--dark-hover);
    }
}
</style>
