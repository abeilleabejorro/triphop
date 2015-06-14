class GroupCostsController < ApplicationController
  def create
    @costs = GroupCost.create(item: params["cost"]["item"], price: params["cost"]["price"])
    @costs.trip_id = params["group_cost"]["trip_id"].to_i
    @costs.user_id = current_user.id
    @costs.save

    @item = @costs.item
    @price = @costs.price
    @user = User.find(@costs.user_id)
    @user_name = @user.name

    @trip = Trip.find(@costs.trip_id)
    @member_count = @trip.members.count

    respond_to do |f|
      f.js
    end
  end
end
