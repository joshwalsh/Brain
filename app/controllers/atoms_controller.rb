class AtomsController < ApplicationController
  before_filter :check_if_exists, only: [:create]

  def index
    @atoms = Atom.all.order(:title).decorate

    respond_to do |format|
      format.html
      format.json {
        render :json => @atoms.to_json
      }
    end
  end

  def show
    @atom = Atom.for_slug(params[:id])

    if @atom.nil?
      @atom = Atom.new
      @atom.title = params[:id]
      render 'create_prompt'
    end

    @atom = @atom.decorate
  end

  def edit
    @atom = Atom.for_slug(params[:id])
    @atom = @atom.decorate
  end

  def create
    atom = Atom.new(atom_params)

    if atom.save
      redirect_to atom
    else
      redirect_to :back, notice: "Atom could not be saved"
    end
  end

  def update
    @atom = Atom.for_slug(params[:id])
    @atom.update_attributes(atom_params)

    redirect_to @atom
  end

  def destroy
    atom = Atom.for_slug(params[:id])
    atom.destroy
    redirect_to setup_path
  end

  protected

  def check_if_exists
    atom = Atom.for_title(params[:title])

    redirect_to atom unless atom.nil?
  end

  def atom_params
    params.require(:atom).permit(
      :title,
      :slug,
      :description
    )
  end
end
