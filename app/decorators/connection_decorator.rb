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

  def markdown_description
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render(description).html_safe
  end
end
