export default (sequelize, DataTypes) => {

const TradeMessage = sequelize.define('TradeMessage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    trade_offer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, { tableName: 'trade_messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
 });
  
  return TradeMessage;
}