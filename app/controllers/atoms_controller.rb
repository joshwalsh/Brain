class AtomsController < ApplicationController
  def show
    @atom = Atom.find(params[:id])
  end

  def create
    atom = check_for_duplicate(atom_params[:title])

    if atom.nil?
      atom = Atom.new(atom_params)

      if atom.save
        redirect_to atom
      else
        redirect_to :back, notice: "Atom could not be saved"
      end
    else 
      redirect_to atom
    end
  end

  def destroy
    atom = Atom.find(params[:id])
    atom.destroy
    redirect_to atoms_path
  end

  protected

  def check_for_duplicate(title)
    return Atom.where(title: title.downcase).first
  end

  def atom_params
    params.require(:atom).permit(
      :title
    )
  end
end

