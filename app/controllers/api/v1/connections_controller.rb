class Api::V1::ConnectionsController < Api::V1::BaseController
  def show
    @connection = Connection.find(params[:id]).decorate
  end

  def edit
    @connection = Connection.find(params[:id])
    @connection = @connection.decorate
  end

  def create
    parent = Atom.find(connection_params[:parent_atom_id]) if connection_params[:parent_atom_id]
    child = Atom.find(connection_params[:child_atom_id]) if connection_params[:child_atom_id]

    atom = Atom.for_title(connection_params[:atom][:title])
    if atom.nil?
      atom = Atom.create(title: connection_params[:atom][:title])
    end

    if parent
      parent.children << atom
    elsif child
      child.parents << atom
    end

    render json: {}, status: :no_content
  end

  def update
    @connection = Connection.find(params[:id])
    @connection.update_attributes(connection_params)

    redirect_to @connection
  end

  def destroy
    connection = Connection.find(params[:id])
    connection.destroy

    render json: {}, status: :no_content
  end

  def connection_params
    params.require(:connection).permit(
      :parent_atom_id,
      :child_atom_id,
      :description,
      atom: [:title]
    )
  end

end
