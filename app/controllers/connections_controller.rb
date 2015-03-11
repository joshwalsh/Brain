class ConnectionsController < ApplicationController
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
      redirect_to parent
    elsif child
      child.parents << atom
      redirect_to child
    end
  end

  def update
    @connection = Connection.find(params[:id])
    @connection.update_attributes(connection_params)

    redirect_to @connection
  end

  def destroy
    connection = Connection.find(params[:id])
    parent = connection.parent

    connection.destroy
    redirect_to parent
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
