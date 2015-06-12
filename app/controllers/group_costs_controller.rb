class GroupCostsController < ApplicationController
  def create
    @costs = GroupCost.create(item: params["cost"]["item"], price: params["cost"]["price"])
    @costs.trip_id = params["group_cost"]["trip_id"].to_i
    @costs.user_id = current_user.id
    @costs.save

    @item = @costs.item
    @price = @costs.price

    respond_to do |f|
      f.js
    end
  end
end
