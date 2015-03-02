class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def boot
    atom = Atom.first

    if atom
      redirect_to atoms_url
    else
      redirect_to setup_path
    end
  end
end
