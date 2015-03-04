class ConnectionsController < ApplicationController
  def show
    @connection = Connection.find(params[:id]).decorate
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
      atom: [:title]
    )
  end

end
