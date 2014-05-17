class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def boot
    atom = Atom.first

    if atom
      redirect_to atom
    else
      redirect_to setup_path
    end
  end
end
