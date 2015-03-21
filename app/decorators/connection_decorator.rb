class ConnectionDecorator < Draper::Decorator
  delegate_all

  decorates_association :parent
  decorates_association :child

  def title
    parent = object.parent.decorate
    child = object.child.decorate

    "#{parent.title} > #{child.title}"
  end

  def description
    return '' if object.description.nil?
    object.description
  end
end
