class Api::V1::AtomsController < Api::V1::BaseController
  before_action :check_if_exists, only: [:create]

  def index
    @atoms = Atom.all.order(:slug).decorate
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

    @atom = @atom.decorate
    render :show
  end

  def destroy
    atom = Atom.for_slug(params[:id])
    atom.destroy

    render json: {}, status: :no_content
  end

  protected

  def check_if_exists
    atom = Atom.for_title(atom_params[:title])

    if (atom)
      render atom
    end
  end

  def atom_params
    params.require(:atom).permit(
      :title,
      :description
    )
  end
end
