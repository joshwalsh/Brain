class AtomDecorator < Draper::Decorator
  delegate_all

  decorates_association :parents
  decorates_association :children
  decorates_association :siblings

  decorates_association :parent_connections
  decorates_association :child_connections

  def title
    object.title.titleize
  end

  def influence
    total = Atom.all.count.to_f
    family = family_size.to_f

    ((family / total) * 100).round(1)
  end

  def family_size
    family = siblings + parents + children
    family = family.uniq
    family.count
  end
end
