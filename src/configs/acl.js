import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

const defineRulesFor = (role, subject) => {
  const { can, cannot, rules } = new AbilityBuilder(AppAbility)
  if (role === 'admin') {
    can('manage', 'all')
  } else {
    can('manage', 'all')
    cannot('read', 'itens-page')
  }

  return rules
}

export const buildAbilityFor = (role, subject) => {
  return new AppAbility(defineRulesFor(role, subject), {
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
