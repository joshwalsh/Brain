class AtomDecorator < Draper::Decorator
  delegate_all

  decorates_association :parents
  decorates_association :children

  decorates_association :parent_connections
  decorates_association :child_connections

  def title
    object.title.titleize
  end

  def influence
    object.influence.round(1)
  end
end
