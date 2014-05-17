class OnboardingController < ApplicationController
  layout 'setup'
  
  def setup
    if Atom.count > 0
      redirect_to Atom.first
    end
  end
end