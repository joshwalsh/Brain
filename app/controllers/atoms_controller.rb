class AtomsController < ApplicationController
  before_filter :check_if_exists, only: [:create]

  def show
    @atom = Atom.find(params[:id])
  end

  def create
    atom = Atom.new(atom_params)

    if atom.save
      redirect_to atom
    else
      redirect_to :back, notice: "Atom could not be saved"
    end
  end

  def destroy
    atom = Atom.find(params[:id])
    atom.destroy
    redirect_to setup_path
  end

  protected

  def check_if_exists
    title = atom_params[:title].downcase
    atom = Atom.where(title: title).first
    
    redirect_to atom unless atom.nil?
  end

  def atom_params
    params.require(:atom).permit(
      :title
    )
  end
end

