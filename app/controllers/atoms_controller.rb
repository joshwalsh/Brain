class AtomsController < ApplicationController
  def index
    @atoms = Atom.all
  end

  def create
    atom = Atom.new(atom_params)

    if atom.save
      redirect_to atoms_path
    end
  end

  def destroy
    atom = Atom.find(params[:id])
    atom.destroy
    redirect_to atoms_path
  end

  def atom_params
    params.require(:atom).permit(
      :title
    )
  end
end

